import { useRouteError } from "react-router-dom";
const Error= () => {
    const err = useRouteError;
    console.log(err);
    return (
        <div className="A">
            <h1></h1>
            <h2>OOPS </h2>
            <h2>SOMETHING WENT wrong </h2>
            <h3>{err.state}  </h3>
            <h2>Try again some time</h2>

        </div>
    );
 };
export default Error;