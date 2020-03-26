var chatroomMixin = {
    methods: {
        getChatroomId(userid1, userid2) {
            let chatroomid;
            //compare lexicographically, greatest first:
            if (userid1.localeCompare(userid2) > 0) {
                chatroomid = userid1 + '_' + userid2;
            } else {
                chatroomid = userid2 + '_' + userid1;
            }
            return chatroomid;
        }
    }
}

export default chatroomMixin;