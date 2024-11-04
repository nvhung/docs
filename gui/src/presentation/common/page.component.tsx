import { MainNav } from "./main-nav.component";

export const Page = (props: any) => {
    const Component = props.renderer;
    return (
        <>
        <MainNav />
        <Component />
        </>
    );
};
