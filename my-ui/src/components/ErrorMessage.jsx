function ErrorMessage({ message }) {
    if (!message) {
      return null;
    }
  
    return (
      <div
        style={{
          color: "red",
          backgroundColor: "#ffe6e6",
          border: "1px solid red",
          padding: "10px",
          marginBottom: "15px",
        }}
      >
        <strong>Error:</strong> {message}
      </div>
    );
  }
  
  export default ErrorMessage;