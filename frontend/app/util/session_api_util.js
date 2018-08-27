export const signup = (user) => (
  $.ajax({
    method: 'POST',
    url: 'api/users/register',
    data: {user}
  })
);

export const login = (user) => (
  $.ajax({
    method: 'POST',
    url: 'api/users/login',
    data: {user}
  })
);

export const currentUser = () => (
  $.ajax({
    method: 'GET',
    url: 'api/users/current'
  })
)

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    // url: 'api/users/current'
  })
);