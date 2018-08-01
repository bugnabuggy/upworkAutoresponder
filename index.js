const config = require('./config.json');
const upworkApi = require('upwork-api');
const Auth = require('upwork-api/lib/routers/auth').Auth;
const Users = require('upwork-api/lib/routers/organization/users.js').Users;
const Messages = require('upwork-api/lib/routers/messages.js').Messages;
// const Companies = require('upwork-api/lib/routers/organization/companies.js').Companies;
const oAuth = require('oauth');

export const handle = (event) => {
  const conf = {
    'consumerKey': config.consumerKey,
    'consumerSecret': config.consumerSecret,
  };
  const api = new upworkApi(conf);
  // const companies = new Companies(api);
  const mc = new Messages(api);
  const users = new Users(api);
  // Authorization
  AuthorizationUser(api);

  // get companies
  // getCompanies(companies)
  
  // get my info
  getMyInfo(users)
    .then((response) => {
      console.log("getMyInfo", response);
      // get unread chat rooms
      return getRooms(mc, 'userId');
    })
    .then((roomsWithMessages) => {
      console.log("getRooms", roomsWithMessages);
      // get check unread rooms (who sent the message and when)
      return checkUnread(mc, response.userId, response.roomsWithUnreadMessages);
    })
    .then((dataForMessages) => {
      console.log("checkUnread done [", dataForMessages, "]");
      // send messages
      return sendMessages(mc, dataForMessages);
    })
    .then((response) => {
      console.log("sendMessages", response);
    })
    .catch((error) => {
      console.log("error = ".red, error);
    });
};

// export const getCompanies = (companies) => {
//   return new Promise((resolve, reject) => {
//     companies.getList(function (error, data) {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

export const getMyInfo = (users) => {
  return new Promise((resolve, reject) => {
    users.getMyInfo((error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

export const getRooms = (mc, userId) => {
  const params = {
    'type': 'all',
  };
  return new Promise((resolve, reject) => {
    mc.getRooms(userId, params, (error, data) => {
      if (error) {
        reject(error);
      }
      const roomsWithUnreadMessages = data.rooms.filter((room) => {
        return room.numUnread > 0;
      });
      resolve({ roomsWithUnreadMessages, userId });
    });
  });
};

export const checkUnread = (mc, userId, roomsWithUnreadMessages) => {
  const params = {
    limit: 5,
    returnStories: true,
    returnUsers: true,
  };
  return new Promise((resolve, reject) => {
    let listOfFilteredRooms = [];
    roomsWithUnreadMessages.forEach((room) => {
      mc.getRoomDetails(userId, room.roomId, params, function (error, data) {
        if (error) {
          reject(error);
        }
        const stories = data.room.stories.stories;
        if (stories.userId != config.userId && (Date.now() - stories.created) > (config.timeLimit * 1000)) {
          listOfFilteredRooms.push({
            roomId: data.room.roomId,
            orgId: data.room.orgId,
            userId: data.room.users.userId,
          });
        }
      });
    });
    resolve(listOfFilteredRooms);
  });
};

export const sendMessages = (mc, settingsForSendMessage) => {
  return new Promise((resolve, reject) => {
    let error = [];
    let arrayPromises = [];
    settingsForSendMessage.forEach((room) => {
      const params = {
        story: {
          message: 'Message',
          orgId: room.orgId,
          userId: room.userId,
        },
      };
      arrayPromises.push(new Promise((resolve, reject) => {
        mc.sendMessageToRoom(room.userId, room.roomId, params, (err, data) => {
          if (err) {
            error.push(err);
            reject(err);
          }
          resolve(config.messageTemplate);
        });
      }));
    });
    Promise.all(arrayPromises)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });

  })
};

const getUserData = (api, callback) => {
  const auth = new Auth(api);
  auth.getUserInfo((error, data) => {
    if (error) {
      console.log('getUserInfo (error)'.red, error);
    } else {
      callback(error, data);
    }
  });
};

const apiSetAccessToken = (api, accessToken, accessTokenSecret) => {
  api.setAccessToken(accessToken, accessTokenSecret, () => {
    getUserData(api, function (error, data) {
      console.log('Hello: ' + data);
    });
  });
};

export const AuthorizationUser = (api) => {
  console.log('AuthorizationUser');
  if (!config.accessToken || !config.accessSecret) {
    getAccessTokenSecretPair((accessToken, accessTokenSecret) => {
      apiSetAccessToken(api, accessToken, accessTokenSecret);
    });
  } else {
    apiSetAccessToken(api, config.accessToken, config.accessSecret);
  }
};

export const getAccessTokenSecretPair = (callback) => {
  const OAuth = new oAuth.OAuth(
    'https://www.upwork.com/api/auth/v1/oauth/token/request',
    'https://www.upwork.com/api/auth/v1/oauth/token/access',
    config.consumerKey,
    config.consumerSecret,
    '1.0',
    null,
    'HMAC-SHA1'
  );
  OAuth.getOAuthRequestToken((error, requestToken, requestTokenSecret) => {
    if (error) {
      console.log("error =".red, error);
    } else {
      console.log("requestToken =".green, requestToken);
      console.log("requestTokenSecret =".green, requestTokenSecret);
      OAuth.getOAuthAccessToken(requestToken, requestTokenSecret, (error, accessToken, accessTokenSecret) => {
        if (error) {
          console.log("error =", error);
        } else {
          console.log("accessToken =".green, accessToken);
          console.log("accessTokenSecret =".green, accessTokenSecret);
          callback(accessToken, accessTokenSecret);
        }
      })
    }
  });
};
