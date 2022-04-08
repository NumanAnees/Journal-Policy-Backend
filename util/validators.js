module.exports.validateRegisterInput = (
  username,
  email,
  password,
) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password === '') {
    errors.password = 'Password must not empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === '') {
    errors.username = 'email must not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
module.exports.validateJournal = (title,url,issn,rating)=>{
  const errors = {};
  if (title.trim() === '') {
    errors.title = 'title must not be empty';
  }
  if (url.trim() === '') {
    errors.url = 'url must not be empty';
  }
   if (issn.trim() === '') {
    errors.issn = 'issn must not be empty';
  }
   if (rating.trim() === '') {
    errors.rating = 'rating must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
}