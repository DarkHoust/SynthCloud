document.addEventListener('DOMContentLoaded', () => {
    const showUsersBtn = document.getElementById('showUsersBtn');
    const showMusicBtn = document.getElementById('showMusicBtn');
    const userManagementSection = document.getElementById('userManagementSection');
    const musicSection = document.getElementById('musicSection');

    showUsersBtn.addEventListener('click', () => {
        userManagementSection.style.display = 'block';
        musicSection.style.display = 'none';
    });

    showMusicBtn.addEventListener('click', () => {
        userManagementSection.style.display = 'none';
        musicSection.style.display = 'block';
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