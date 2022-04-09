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
module.exports.validateJournal = ( 
        title,
        issn,
        rating,
        url,
        date,
        policies,
        domain )=>{
  const policy = JSON.parse(JSON.stringify(policies));
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
  if (date.trim() === '') {
    errors.date = 'date must not be empty';
  }
  if (domain.trim() === '') {
    errors.domain = 'domain must not be empty';
  }
  if (policy.title.trim() === '') {
    errors.policy = 'policy title must not be empty';
  }
  if (policy.first_year.trim() === '') {
    errors.policy = 'policy first year must not be empty';
  }
  if (policy.last_year.trim() === '') {
    errors.policy = 'policy last year must not be empty';
  }
  if (policy.policy_type.trim() === '') {
    errors.policy = 'policy type must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
}