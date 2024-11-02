export const Section = ({label, visible = true, children}) => (
    <>
    {visible && <div className="fw-bold mb-3 border-bottom">{label}</div>}
    {visible && children}
    </>
);
