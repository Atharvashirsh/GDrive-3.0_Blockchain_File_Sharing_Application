// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct Access {
        address user;
        bool access; //true or false
    }

    struct File {
        uint fileId;
        string fileName;
        uint fileSize;
        string fileType;
        uint uploadTime;
        string fileHash;
        address accNum;
    }

    mapping(address => File[]) value;
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList;
    mapping(address => mapping(address => bool)) previousData;
    mapping(address => mapping(string => uint)) fileIndex; // store file hash with index
    uint public fileCounter = 0;
    uint public fileCount;

    function fetchFileIndex(
        address _user,
        string memory _fileHash
    ) private view returns (uint256) {
        return fileIndex[_user][_fileHash];
    }

    function add(
        address _user,
        uint _fileSize,
        string memory _fileType,
        string memory _fileName,
        string memory _fileHash
    ) external {
        fileCounter++;
        value[_user].push(
            File(
                fileCounter,
                _fileName,
                _fileSize,
                _fileType,
                block.timestamp,
                _fileHash,
                _user
            )
        );

        fileCount = value[_user].length;
        fileIndex[_user][_fileHash] = fileCount - 1;
    }

    function allow(address user) external {
        //def
        ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }
    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (File[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "You don't have access"
        );
        return value[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    function remove(string memory _fileHash, address _owner) external {
        require(_owner == msg.sender, "You don't have access");
        uint index = fetchFileIndex(msg.sender, _fileHash);
        delete value[msg.sender][index];
    }
}
