document.addEventListener('DOMContentLoaded', () => {
    const showUsersBtn = document.getElementById('showUsersBtn');
    const showMusicBtn = document.getElementById('showMusicBtn');
    const userManagementSection = document.getElementById('userManagementSection');
    const musicSection = document.getElementById('musicSection');
    const userAddButton = document.getElementById('addUserBtn')

    showUsersBtn.addEventListener('click', () => {
        userManagementSection.style.display = 'block';
        musicSection.style.display = 'none';
        userAddButton.style.display = 'block';
    });

    showMusicBtn.addEventListener('click', () => {
        userManagementSection.style.display = 'none';
        musicSection.style.display = 'block';
        userAddButton.style.display = 'none';
    });
});

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/api/users/${userId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            location.reload();
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again later.');
        });
    }
}

function deleteMusic(musicId) {
    if (confirm('Are you sure you want to delete this music?')) {
        fetch(`/api/music/${musicId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete music');
            }
            location.reload();
        })
        .catch(error => {
            console.error('Error deleting music:', error);
            alert('Failed to delete music. Please try again later.');
        });
    }
}

const openEditUserModal = (userId) => {
    const modal = document.getElementById('editUserModal');

    fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('editUserId').value = user._id;
            document.getElementById('editUsername').value = user.username;
            document.getElementById('editUserEmail').value = user.mail;
            modal.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error retrieving user data:', error);
            alert('Failed to retrieve user data. Please try again later.');
        });
};

const openEditMusicModal = (musicId) => {
    const modal = document.getElementById('editMusicModal');

    fetch(`/api/music/${musicId}`)
        .then(response => response.json())
        .then(music => {
            document.getElementById('editMusicId').value = music._id;
            document.getElementById('editSongName').value = music.songName;
            document.getElementById('editArtist').value = music.artist;
            document.getElementById('editDescription').value = music.desciption;
            modal.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error retrieving music data:', error);
            alert('Failed to retrieve music data. Please try again later.');
        });
};

function closeUserModal() {
    const modal = document.getElementById('editUserModal');
    modal.classList.add('hidden');
}

function closeMusicModal() {
    const modal = document.getElementById('editMusicModal');
    modal.classList.add('hidden');
}

const saveUserChanges = async () => {
    const userId = document.getElementById('editUserId').value;
    const username = document.getElementById('editUsername').value;
    const email = document.getElementById('editUserEmail').value;
    console.log(userId, username, email);

    try {
        const response = await fetch(`/api/users/${userId}?username=${username}&email=${email}`, {method: 'PUT'});

        if (response.ok) {
            closeUserModal();
        } else {
            console.error('Failed to update user data');
        }
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};

const saveMusicChanges = async () => {
    const musicId = document.getElementById('editMusicId').value;
    const songName = document.getElementById('editSongName').value;
    const artist = document.getElementById('editArtist').value;
    const description = document.getElementById('editDescription').value;
    console.log(musicId, songName, artist,description);

    try {
        const response = await fetch(`/api/music/${musicId}?songName=${songName}&artist=${artist}&description=${description}`, {method: 'PUT',});

        if (response.ok) {
            closeMusicModal();
        } else {
            console.error('Failed to update music data');
        }
    } catch (error) {
        console.error('Error updating music data:', error);
    }
};

document.querySelectorAll('.editUserBtn').forEach(button => {
    button.addEventListener('click', () => {
        const userId = button.parentElement.parentElement.querySelector('.hidden').innerText;
        openEditUserModal(userId);
    });
});

document.querySelectorAll('.editMusicBtn').forEach(button => {
    button.addEventListener('click', () => {
        const musicId = button.parentElement.parentElement.querySelector('.hidden').innerText;
        openEditMusicModal(musicId);
    });
});

const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
};

document.getElementById('saveUserChangesBtn').addEventListener('click', saveUserChanges);
document.getElementById('saveMusicChangesBtn').addEventListener('click', saveMusicChanges);
document.getElementById('closeUserModalBtn').addEventListener('click', closeUserModal);
document.getElementById('closeMusicModalBtn').addEventListener('click', closeMusicModal);


// Create new user Modals

function openCreateUserModal() {
    document.getElementById('createUserModal').classList.remove('hidden');
}

function closeCreateUserModal() {
    document.getElementById('createUserModal').classList.add('hidden');
}

document.getElementById('addUserBtn').addEventListener('click', openCreateUserModal);
document.getElementById('closeCreateUserModalBtn').addEventListener('click', closeCreateUserModal);
document.getElementById('saveNewUserBtn').addEventListener('click', saveNewUser);

async function saveNewUser() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const newEmail = document.getElementById('newEmail').value;

    try {
        const response = await fetch(`/api/users?username=${newUsername}&mail=${newEmail}&password=${newPassword}`, {method: 'POST',});

        if (response.ok) {
            closeCreateUserModal();
        } else {
            console.error('Failed to create user');
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
}
