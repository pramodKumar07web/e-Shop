import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <>
     
      <div>Success</div>
      <Link to='/'>
        <h1>Click here to Go Home</h1>
      </Link>
    </>
  );
}

export default SuccessPage;
