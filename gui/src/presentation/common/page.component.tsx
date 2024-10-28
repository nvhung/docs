import { MainNav } from "./main-nav.component";

export const Page = (props: any) => {
    const Component = props.renderer;
    return (
        <>
        <MainNav />
        <div className="m-3">
            <Component />
        </div>
        </>
    );
};
