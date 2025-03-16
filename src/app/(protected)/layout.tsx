import './layout.scss'
import Header from "app/features/tasks/ui/header/Header";

const Layout = ({children}) => {
    return (
        <div>
            <Header/>
            <main className='protected-layout__main'>
                {children}
            </main>
        </div>
    )
};

export default Layout;
