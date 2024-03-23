import { useState } from 'react';
import Modal from "./Modal";

function NewUser() {
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleCreateAccount = () => {
    // send user data to the server for account creation
    fetch(`/api/climbs/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id: user_id, password: password, firstname: firstname, lastname: lastname })
    })
      .then(result => {
        // Handle the response from the server as needed
        if (!result.ok) {
          throw new Error("Error creating user account");
        }
        return result.json();
      })
      .then(json => {
        // Handle the success response from the server, e.g., show a success message
        console.log("User account created successfully:", json);
      })
      .catch(error => {
        // Handle errors, e.g., show an error message to the user
        console.error("Error creating user account:", error.message);
      });
            // Clear the form inputs after successful submission
            setUser_id("");
            setPassword("");
            setFirstname("");
            setLastname("");
  };

  return (
    <div>
      <h1>Create New User Account</h1>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            className="form-style"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-style"
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="form-style"
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="form-style"
          />
        </div>
        {/* <button type="button" onClick={handleCreateAccount} className="btn">
          Create Account
        </button> */}
        <Modal
          launchBtnText="Create Account"
          modalTitle="User successfully created!🎉"
        />
      </form>
    </div>
  );
}

export default NewUser;
