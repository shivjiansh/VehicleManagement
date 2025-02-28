import React from "react";

function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          marginTop: "20px",
          fontSize: "28px", 
          fontWeight: "bold", 
          color: "#333", 
          textAlign: "center", 
          
          backgroundColor: "#fff", 

          maxWidth: "80%", 
        }}
      >
        Welcome to Vehicle Service Center
      </p>
      <img
        src="https://i.pinimg.com/originals/73/5c/ea/735cea56968f703df45d4c551ee3b160.gif"
        style={{
          maxWidth: "50%",
          maxHeight: "50%",
          objectFit: "contain",
          width: "auto",
          height: "auto",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around", 
          width: "100%", 
          marginTop: "20px", 
        }}
      >
        <a
          href="http://localhost:3000/components"
          style={{
            textAlign: "center",
            display: "block",
            textDecoration: "none",
          }}
        >
          <img
            src="data:image/jpeg;base64,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"
            style={{ width: "80px", height: "80px", marginBottom: "5px" }}
          />
          <br />
          Component
        </a>

        <a
          href="http://localhost:3000/vehicles"
          style={{
            textAlign: "center",
            display: "block",
            textDecoration: "none",
          }}
        >
          <img
            src="https://static.thenounproject.com/png/54657-200.png"
            alt="Link 2"
            style={{ width: "80px", height: "80px", marginBottom: "5px" }}
          />{" "}
          <br /> Add Vehicle
        </a>

        <a
          href="http://localhost:3000/issues"
          style={{
            textAlign: "center",
            display: "block",
            textDecoration: "none",
          }}
        >
          <img
            src="https://img.lovepik.com/original_origin_pic/18/08/25/44e661a8357995c94bf5ed0636c0d8d3.png_wh860.png"
            alt="Link 3"
            style={{
              width: "80px",
              height: "80px",
              marginBottom: "5px",
            }}
          />
          <br></br>Create an issue
        </a>

        <a
          href="http://localhost:3000/report"
          style={{
            textAlign: "center",
            display: "block",
            textDecoration: "none",
          }}
        >
          <img
            src="https://w7.pngwing.com/pngs/74/609/png-transparent-graph-chart-cardinaleway-mazda-peoria-business-sales-company-cartoon-creative-business-advertising-infographic-cartoon-character-angle-thumbnail.png"
            alt="Link 4"
            style={{ width: "80px", height: "80px", marginBottom: "5px" }}
          />
          <br></br>View report
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
