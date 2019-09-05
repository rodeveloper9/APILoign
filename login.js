// To show error
function setError(ele, msg) {
    ele.innerText = msg;
    ele.style.display = 'block';
};
// To hide error
function hideError(ele) {
    ele.style.display = 'none';
};

// Function to call API and Validation
function apiCall() {
    const userId = document.getElementById('email').value;
    const password = document.getElementById('paswrd').value;
    const errorEle = document.getElementById('emailError');
    hideError(errorEle);
    if (userId === '' || password === '') {
        setError(errorEle, 'Please enter Email and Password');
    }
    else {
        document.getElementById('loginbtn').style.display = 'none';
        document.getElementById('btnLoader').style.display = 'block';
        const Url = ''; // API URL here
        const data = {
            username: userId,
            password: password
        };
        const otherParams = {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
            method: 'POST'
        };
        fetch(Url, otherParams)
            .then(data => { return data.json() })
            .then(res => {
                afterMailHandler(res, errorEle);
            })
            .catch(error => console.log(error))
    }

}

// after response handler
function afterMailHandler(res, errorEle) {
    const { status = {} } = res;
    const { success = true } = status;
    if (success) {
        window.location = 'profile.html';
    }
    else {
        document.getElementById('loginbtn').style.display = 'block';
        document.getElementById('btnLoader').style.display = 'none';
        setError(errorEle, 'Invalid username or Password')
        document.getElementById('invalidPwd').style.display = 'block';
    }
}

// Function to Show and Hide password 
function showPaswrd() {
    const paswrd = document.getElementById('paswrd');
    if (paswrd.type === 'password') {
        paswrd.type = 'text';
    } else {
        paswrd.type = 'password';
    }
}
function pwdIcon() {
    const paswrdIcon = document.getElementById('shwpaswrd');
    paswrdIcon.classList.toggle('eye');
}
