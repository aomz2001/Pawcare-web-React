import { Link, useRouteError } from "react-router-dom";
import { ReactElement } from "react";
import Buttons from "../../../components/ItemsGroup/Button/Buttons";

interface ErrorObject {
    statusText?: string;
    message?: string;
}

const ErrorPage = (): ReactElement => {
    const rawError = useRouteError();
    const error: ErrorObject = rawError as ErrorObject;
    console.error(error);
    return (
        <>
            <section className="bg-[#2D2D2D] h-screen">
                <div className="container w-full h-full">
                    <div className="text-white w-full h-full">
                        <div className="flex flex-col justify-center items-center w-full h-full gap-y-5">
                            <Link to='/'>
                                <img src="src/assets/image/Logo.png" className="h-28" alt="" />
                            </Link>
                            <div className="text-4xl">Oops !</div>
                            <div className="text-4xl">--- ERROR 404 ---</div>
                            <div className="text-4xl">Sorry, the page you request was {error?.statusText || error?.message}</div>
                            <Link to='/'>
                                <Buttons
                                    label={"Go back to home page"}
                                    buttonType="secondary"
                                    className="text-white mt-5 w-60 p-2 rounded-full text-lg"
                                    onClick={() => { }}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ErrorPage;
