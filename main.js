import {
  // handle,
  checkUnread,
  AuthorizationUser,
  // getCompanies,
  getMyInfo,
  getRooms,
  sendMessages
} from './index';
import { myInfo, rooms, roomDetails, settingsForSendMessage } from './mock';
import colors from 'colors';

function Test_getMyInfo() {
  const user = {
    getMyInfo: (callback) => {
      callback(null, myInfo);
    },
  };
  getMyInfo(user)
    .then((response) => {
      console.log("Test_getMyInfo response \n".green, response);
    })
    .catch((error) => {

    });
};

function Test_getRooms() {
  const message = {
    getRooms: (userId, params, callback) => {

      callback(null, rooms);
    },
  };
  getRooms(message, 10)
    .then((response) => {
      if (response.roomsWithUnreadMessages.length === 2) {
        console.log("Test_getRooms true ".green);
      } else {
        console.log("Test_getRooms false ".red);
      }
    })
    .catch((error) => {

    });
};

function Test_checkUnread() {
  const mc1 = {
    getRoomDetails: (userId, roomId, params, callback) => {
      const roomDitail = roomDetails.filter((item) => {
        if (item.room.stories.stories.userId !== userId && item.room.roomId.localeCompare(roomId) === 0) {
          return true;
        } else {
          return false;
        }
      });
      callback(null, roomDitail[0]);
    }
  };
  const mc2 = {
    getRoomDetails: (userId, roomId, params, callback) => {
      const roomDitail = roomDetails.filter((item) => {
        if (item.room.stories.stories.userId === userId && item.room.roomId.localeCompare(roomId) === 0) {
          return true;
        } else {
          return false;
        }
      });
      callback(null, roomDitail[0]);
    }
  };
  checkUnread(mc1, 10, [rooms.rooms[1], rooms.rooms[3]])
    .then((response) => {
      // console.log("Test_checkUnread true ", response);
      if (response.length === 2) {
        console.log("Test_checkUnread 1 true ".green);
      } else {
        console.log("Test_checkUnread 1 false ".red);
      }

      return checkUnread(mc2, 10, [rooms.rooms[1], rooms.rooms[3]])
    })
    .then((response) => {
      // console.log("Test_checkUnread true ", response);
      if (response.length === 0) {
        console.log("Test_checkUnread 2 true ".green);
      } else {
        console.log("Test_checkUnread 2 false ".red);
      }
    })
    .catch((error) => {

    });
};

function Test_sendMessages() {
  const mc = {
    sendMessageToRoom: (userId, roomId, params, callback) => {
      callback(null, 'success');
    }
  };
  const mc2 = {
    sendMessageToRoom: (userId, roomId, params, callback) => {
      if(userId === 10) {
        callback('error mc2', null);
      } else {
        callback(null, 'success');
      }
    }
  };
  sendMessages(mc, settingsForSendMessage)
    .then((response) => {
      console.log("Test_sendMessages 1 true ".green);
    })
    .catch((error) => {
      console.log("Test_sendMessages 1 false ".red, error);
    });

  sendMessages(mc2, settingsForSendMessage)
    .then((response) => {
      console.log("Test_sendMessages 2 false ".red);
    })
    .catch((error) => {
      console.log("Test_sendMessages 2 true ".green, error);
    });
};

Test_getMyInfo();
Test_getRooms();
Test_checkUnread();
Test_sendMessages();

// AuthorizationUser();
// getCompanies();
