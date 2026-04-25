function LoadingSpinner({ message = "Loading..." }) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div
          style={{
            width: "35px",
            height: "35px",
            border: "5px solid #ccc",
            borderTop: "5px solid #333",
            borderRadius: "50%",
            margin: "0 auto",
            animation: "spin 1s linear infinite",
          }}
        ></div>
  
        <p>{message}</p>
  
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }
  
  export default LoadingSpinner;