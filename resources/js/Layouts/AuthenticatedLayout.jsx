import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';

export default function AuthenticatedLayout({ children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />

            <main style={{ flexGrow: 1 }}>
                {children}
            </main>

            <Footer />
        </div>
    );
}