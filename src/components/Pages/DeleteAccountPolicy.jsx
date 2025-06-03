import React from "react";

const DeleteAccount = () => {
  return (
    <>
      <div className="Agree">
        <div className="user-details">
          <h1
            className="agreement"
            style={{
              fontWeight: "700",
              textDecoration: "underline",
              textAlign: "center",
              margin: "3.5% 0%",
              fontSize: "3.5rem",
            }}
          >
            Delete Account Policy
          </h1>
          <p className="aa">
            <h4>
              {" "}
              1. Introduction<br></br>
            </h4>
            This policy outlines the procedure for deleting user accounts for an
            application designed exclusively for internal use by employees. The
            app is restricted to employees who have been pre-verified, and
            account creation is not available to the public. This policy ensures
            compliance with relevant data privacy regulations and the latest
            requirements set forth by Google.
          </p>
        </div>
        <br></br>

        <div className="aaa">
          <p>
            <h4>
              {" "}
              2. Account Deletion Request<br></br>
            </h4>
            Submitting a Request: Employees may request the deletion of their
            account by submitting a request via the designated web portal or
            weblink. This link is accessible only to authorized users within the
            company’s internal network.
          </p>
        </div>
        <div className="aaa">
          <p>
            <h5>Verification:</h5>
            Upon receiving a deletion request, the system will verify the
            identity of the requester to ensure that the account belongs to the
            employee making the request.
            <h5>Processing the Request:</h5>
            After verification, the account deletion process will be initiated.
            The user’s data will be permanently removed from the app’s database
            within [X days] of the request.<br></br>
          </p>
          <br></br>
        </div>
        <p>
          <h4>3. Access to the Deletion Portal</h4>
          Internal Access Only: The account deletion portal is accessible only
          within the organization’s network and is not available to the general
          public. Only current employees with valid credentials can access the
          portal.<br></br>
        </p>
        <br></br>

        <div className="aaa">
          <p>
            <h4>
              4. Data Deletion<br></br>
            </h4>
            Data Removed: Once the account deletion is confirmed, all personal
            data associated with the account will be permanently deleted from
            the system. This includes login credentials, profile information,
            and any other data linked to the account.
          </p>
          <h5>
            Exceptions:<br></br>
          </h5>
          Certain data required for legal, compliance, or operational purposes
          may be retained in a non-identifiable format, as permitted by
          applicable laws.
        </div>
        <br></br>
        <br></br>

        <div className="aaa">
          <p>
            <h4>
              5. Consequences of Account Deletion<br></br>
            </h4>
            <h5>
              Service Termination:<br></br>
            </h5>
            Deleting an account will result in the termination of access to the
            app and any associated services. Employees should ensure that they
            have no pending tasks or essential data within the app before
            requesting deletion.<br></br>
          </p>
        </div>
        <br></br>

        <div className="aaa">
          <p>
            <h4>
              6. Irreversibility:<br></br>
            </h4>
            Once an account is deleted, the process is irreversible. Employees
            who wish to regain access to the app will need to undergo the
            account creation process again, subject to organizational approval.
            <br></br>
          </p>
        </div>
        <br></br>

        <div className="aaa">
          <p>
            <h4>
              7. Support and Contact Information<br></br>
            </h4>
            For any questions or issues related to account deletion, employees
            may contact the support team or IT department at the designated
            support email or phone number.<br></br>
          </p>
        </div>
        <br></br>
      </div>
    </>
  );
};

export default DeleteAccount;
