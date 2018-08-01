export const companies = [
  {
    'name': 'A Test Company',
    'owner_ciphertext': '~~abcdf12345',
    'payment_verification_status': 'VERIFIED',
    'reference': '12345'
  },
  {
    'name': 'B Test Company',
    'owner_ciphertext': '~~g4dfs64g',
    'payment_verification_status': 'VERIFIED',
    'reference': '23456'
  },
  {
    'name': 'C Test Company',
    'owner_ciphertext': '~~gs47d1g4ffd',
    'payment_verification_status': 'VERIFIED',
    'reference': '34567'
  },
  {
    'name': 'D Test Company',
    'owner_ciphertext': '~~hsrt71hg5f',
    'payment_verification_status': 'VERIFIED',
    'reference': '45678'
  },
  {
    'name': 'E Test Company',
    'owner_ciphertext': '~~r41h5fg4hd',
    'payment_verification_status': 'VERIFIED',
    'reference': '56789'
  },
];

export const myInfo = {
  'timezone': 'UTC+07:00 Bangkok, Jakarta, Hanoi',
  'status': 'active',
  'timezone_offset': '25200',
  'public_url': 'https://www.upwork.com/...',
  'last_name': 'Johnson',
  'email': 'my_upwork_username@example.com',
  'reference': '12345',
  'id': '10',
  'is_provider': '1',
  'first_name': 'John',
  'profile_key': '...'
};

export const rooms = {
  'auth_user': {},
  'server_time': 123456790,
  'rooms': [
    {
      'roomId': 'room_12345',
      orgId: '',
      roomName: "Corp Name",
      roomType: "type",
      topic: 'topic',
      numUnread: 0,
      numUnreadMentions: '',
      numUsers: 2,
      isFavorite: false,
      latestStory: {
        created: 1201864186,
        updated: 13450487704,
      },
      users: {
        userId: 32,
        orgId: 10,
        role: '123',
      },
      cursor: '',
      total: 3,
      appId: 'appId_1'
    },
    {
      'roomId': 'room_12345',
      orgId: '',
      roomName: "Corp Name",
      roomType: "type",
      topic: 'topic',
      numUnread: 1,
      numUnreadMentions: '',
      numUsers: 2,
      isFavorite: false,
      latestStory: {
        created: 1201864186,
        updated: 13450487704,
      },
      users: {
        userId: 32,
        orgId: 10,
        role: '123',
      },
      cursor: '',
      total: 3,
      appId: 'appId_1'
    },
    {
      'roomId': 'room_12345',
      orgId: '',
      roomName: "Corp Name",
      roomType: "type",
      topic: 'topic',
      numUnread: 0,
      numUnreadMentions: '',
      numUsers: 2,
      isFavorite: false,
      latestStory: {
        created: 1201864186,
        updated: 13450487704,
      },
      users: {
        userId: 10,
        orgId: 10,
        role: '123',
      },
      cursor: '',
      total: 3,
      appId: 'appId_1'
    },
    {
      'roomId': 'room_12345',
      orgId: '',
      roomName: "Corp Name",
      roomType: "type",
      topic: 'topic',
      numUnread: 1,
      numUnreadMentions: '',
      numUsers: 2,
      isFavorite: false,
      latestStory: {
        created: 1201864186,
        updated: 13450487704,
      },
      users: {
        userId: 10,
        orgId: 10,
        role: '123',
      },
      cursor: '',
      total: 3,
      appId: 'appId_1'
    }
  ],
};

export const roomDetails = [
  {
    'auth_user': {
    },
    'server_time': 123456790,
    'room': {
      'roomId': 'room_12345',
      'roomName': 'Room name',
      orgId: '',
      roomType: "type",
      topic: 'topic',
      lastReadTimestamp: 1533111191232,
      recentTimestamp: 1533111206384,
      isFavorite: false,
      isReadOnly: false,
      isHidden: false,
      role: 'role',
      users: {
        userId: 10,
        orgId: 10,
        role: '123',
      },
      stories: {
        stories: {
          storyId: 82,
          created: 1533111191232,
          updated: 'date',
          userId: 35,
          message: 'message',
          isSystemStory: false,
        },
        cursor: '',
        total: 1,
      },
    },
  },
  {
    'auth_user': {
    },
    'server_time': 123456790,
    'room': {
      'roomId': 'room_12345',
      'roomName': 'Room name',
      orgId: '',
      roomType: "type",
      topic: 'topic',
      lastReadTimestamp: 1533111191232,
      recentTimestamp: 1533111206384,
      isFavorite: false,
      isReadOnly: false,
      isHidden: false,
      role: 'role',
      users: {
        userId: 10,
        orgId: 10,
        role: '123',
      },
      stories: {
        stories: {
          storyId: 82,
          created: 1533111191232,
          updated: 'date',
          userId: 10,
          message: 'message',
          isSystemStory: false,
        },
        cursor: '',
        total: 1,
      },
    },
  },
];

export const settingsForSendMessage = [
  {
    roomId: 'room_12345',
    orgId: '1',
    userId: 10,
  },
  {
    roomId: 'room_12345',
    orgId: '1',
    userId: 35,
  },
  {
    roomId: 'room_12345',
    orgId: '1',
    userId: 40,
  },
  {
    roomId: 'room_12345',
    orgId: '1',
    userId: 4,
  },
  {
    roomId: 'room_12345',
    orgId: '1',
    userId: 1,
  }
];