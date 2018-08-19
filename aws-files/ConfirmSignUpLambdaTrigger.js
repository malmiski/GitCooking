const AWS = require("aws-sdk");
const uuid = require("uuid");
const docClient = new AWS.DynamoDB.DocumentClient({ "region": "us-east-1" })
const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })

exports.handler = async(event, context, callback) => {
        console.log(event.userName);
        
            var user = await cognito.adminGetUser({
                UserPoolId: "us-east-1_n3HtGeVnb",
                Username: event.userName
            }).promise();
            var userID = "";
            for (var attr in user.UserAttributes) {
                // console.log(attr)
                if (user.UserAttributes[attr].Name === 'sub') {
                    // console.log(user.UserAttributes[attr].Value);
                    userID = user.UserAttributes[attr].Value;
                }
            }
            // When we create a user, we should also create the 21 log entries that they will
            // update when they fill out their log
            var logEntryRequests = []
            // For batch writing/putting objects in DynamoDB we need to build
            // our object
            for (var j = 1; j <= 7; j++) {
                for (var k = 1; k <= 3; k++) {
                    var mealType = "";
                    switch (k) {
                        case 1:
                            mealType = "BREAKFAST";
                            break;
                        case 2:
                            mealType = "LUNCH";
                            break;
                        case 3:
                            mealType = "DINNER";
                            break;
                    }
                    var logEntry = {
                        id: { S: uuid.v4() },
                        day: {
                            N: `${j}`

                        },
                        contents: {
                            L: []
                        },
                        cost: {
                            N: "0"
                        },
                        name: { S: " " },
                        meal: {
                            S: mealType
                        },
                        userID: {
                            S: userID
                        }
                    };
                    logEntryRequests.push({
                        PutRequest: { Item: logEntry }
                    })
                }
            }
            var logRequest = { RequestItems: { "LogEntryTable": logEntryRequests } }
            var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

            ddb.batchWriteItem(logRequest, (err, data) => {
                console.log(err)
            })
            var params = {
                Item: {
                    //id: "a7dec139-188a-4936-b8a0-f454b1e368f4",
                    id: userID,
                    username: event.userName,
                    name: event.request.userAttributes.name,
                    phone_number: event.request.userAttributes.phone_number,
                    email: event.request.userAttributes.email,
                    profile_pic: "http://partnersinwealth.com.au/wp-content/uploads/2018/05/empty-profile-picture-woman.jpg",
                    friendIDs: [],
                    reviewIDs: [],
                    favoriteIDs: [],
                    friendIDs: [],
                    userLogIDs: [],
                },
                TableName: "UsersTable"
            };
            docClient.put(params, (err, data) => {
                // console.log(err);

            });
            callback(null, event);
        };
