const axios = require('axios');
// const userCreation  = require('../models/userCreationmodel');
const { userCreation, userCount } = require('../models/userCreationmodel');
const jwt = require("jsonwebtoken");
require('dotenv').config();



module.exports = (() => {
    return {

       
        listOfProducts: async (req, res) => {
            try {
                const productList = await productCreate.find()

                if (!productList || productList.length === 0) {
                    return res.status(200).json({
                        message: "No Data Available",
                        productList: [],
                        status: 200
                    })

                }

                res.status(200).json({
                    message: "Product Data Fetched Successfully",
                    data: productList,
                    status: 200
                })

            } catch (error) {
                res.status(500).json({
                    message: "Failed to Fetch Product Data",
                    error: error.message
                })

            }

        },

  userCreationSave: async (req, res) => {
            console.log("userCreationSave",req,res)
            try {
                console.log("req.body", req.body);
                const { userName, userFirstName, userLastName, userEmail, userContact, userPassword, userConfirmPassword, userStatus, userActivity } = req.body;
                console.log("userPassword", userPassword, "userConfirmPassword", userConfirmPassword);

                if (userPassword !== userConfirmPassword) {
                    return res.status(400).json({ message: "Passwords do not match", status: 400 });
                }

                const existingUser = await userCreation.findOne({ userEmail });
                if (existingUser) {
                    return res.status(400).json({ message: "User with this email already exists", status: 400 });
                }

                const counter = await userCount.findOneAndUpdate(
                    { name: "userUniqueId" },
                    { $inc: { value: 1 } },
                    { new: true, upsert: true, setDefaultsOnInsert: true }
                );
                const userUniqueId = counter.value;
                console.log("userUniqueId", userUniqueId);

                // Do NOT hash the password, save it as plain text
                const userPayload = new userCreation({
                    userName,
                    userFirstName,
                    userLastName,
                    userEmail,
                    userContact,
                    userPassword, // Store plain text password
                    userConfirmPassword, // Store plain text confirm password (you might not need to save this)
                    userStatus,
                    userActivity,
                    userUniqueId
                });

                const saveNewUser = await userPayload.save();
                res.status(201).json({
                    message: "User Created Successfully",
                    data: {
                        userName: saveNewUser.userName,
                        userStatus: saveNewUser.userStatus,
                        userActivity: saveNewUser.userActivity,
                        userUniqueId: saveNewUser.userUniqueId
                    },
                    status: 201
                });
            } catch (error) {
                res.status(500).json({ message: "Failed to save the user", status: 500, error: error.message });
            }
        },
 getAllUserLists: async (req, res) => {
            try {
                const usersList = await userCreation.find()
                console.log("usersList", usersList)
                if (usersList.length === 0) {
                    res.json({
                        message: "No Data Available",
                        status: 200
                    })
                }
                res.json({
                    message: "User Data Fetched Successfully",
                    data: usersList,
                    status: 200
                })

            } catch (error) {

                res.json({
                    error: error.message
                })
            }
        },
        updateUserCreation: async (req, res) => {
            try {
                const { UniqueId } = req.params;
                const updateUserData = req.body;

                // If the password is being updated, keep it as plain text (no hashing)
                if (updateUserData.userPassword) {
                    updateUserData.userPassword = updateUserData.userPassword; // Don't hash the password
                }

                const updateUserObj = await userCreation.findOneAndUpdate(
                    { userUniqueId: UniqueId },
                    { $set: updateUserData },
                    { new: true, runValidators: true }
                );

                if (!updateUserObj) {
                    return res.status(404).json({ message: "User Not Found", status: 404 });
                }

                res.status(200).json({ message: "User Updated Successfully", data: updateUserObj, status: 200 });
            } catch (error) {
                res.status(500).json({ message: "Update Failed", status: 500, error: error.message });
            }
        },
        
        userLogin: async (req, res) => {
            try {
                const { userName, userPassword } = req.body; // Get username and password
                console.log("userName", userName, userPassword);

                const user = await userCreation.findOne({ userName }); // Find user by username
                console.log("user", user)
                if (!user) {
                    return res.status(404).json({
                        message: "User Not Found. Please enter a valid User",
                        status: 404,
                        isValid: false
                    });
                }
                let obj = {
                    userName: user.userName,
                    userFirstName: user.userFirstName,
                    userLastName: user.userLastName,
                    userEmail: user.userEmail,
                    userUniqueId: user.userUniqueId,
                    userStatus: user.userStatus,
                    isValid: user.userStatus,
                    userActivity: user.userActivity
                }
                console.log("password", userPassword, "user.userPassword", user.userPassword);
                if (user.userStatus == false) {
                    return res.status(200).json({
                        message: "User Not In Active",
                        status: 200,
                        data: obj,
                    });
                }
                // Compare plain password directly
                if (userPassword !== user.userPassword) {
                    return res.status(400).json({
                        message: "Invalid Credentials",
                        status: 400,
                        isValid: false
                    });
                }

                const token = jwt.sign(
                    { id: user._id, userName: user.userName }, // JWT payload with username
                    process.env.JWT_SECRET || "your_jwt_secret",
                    { expiresIn: "1h" }
                );



                res.status(200).json({
                    message: "Login Successful",
                    status: 200,
                    data: obj,
                    token
                });
            } catch (error) {
                res.status(500).json({ message: "Server Error", status: 500, isValid: false, error: error.message });
            }
        },




      
    };
})();




