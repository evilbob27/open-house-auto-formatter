import DataInput from '@/layout/DataInput';
import OutputTable from '@/layout/OutputTable';
import { DataProvider } from "@/context/DataContext";

export default function Home() {
    return (
        <DataProvider>
            <section>
                <DataInput/>
                <OutputTable/>
            </section>
        </DataProvider>
    );
}
