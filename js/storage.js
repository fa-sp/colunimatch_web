/* ===== localStorage Helpers ===== */
const Storage = (() => {
  const USERS_KEY = 'colunimatch_users';
  const SESSION_KEY = 'colunimatch_session';

  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function register(name, email, password) {
    const users = getUsers();
    if (users.find(u => u.email === email)) return { ok: false, msg: 'Ya existe una cuenta con este correo.' };
    const user = { id: Date.now(), name, email, password, answers: null, results: null };
    users.push(user);
    saveUsers(users);
    setSession(user);
    return { ok: true, user };
  }

  function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, msg: 'Correo o contraseña incorrectos.' };
    setSession(user);
    return { ok: true, user };
  }

  function setSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email }));
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function getCurrentUser() {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    if (!session) return null;
    const users = getUsers();
    return users.find(u => u.id === session.id) || null;
  }

  function updateUser(updatedUser) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === updatedUser.id);
    if (idx === -1) return;
    users[idx] = updatedUser;
    saveUsers(users);
  }

  function saveAnswers(answers) {
    const user = getCurrentUser();
    if (!user) return;
    user.answers = answers;
    updateUser(user);
  }

  function saveResults(results) {
    const user = getCurrentUser();
    if (!user) return;
    user.results = results;
    updateUser(user);
  }

  return { register, login, logout, getCurrentUser, saveAnswers, saveResults, updateUser };
})();

