import './Home.scss';
import { ActionSelect } from '../ActionSelect/ActionSelect';
import { MultiForm } from '../MultiForm/MultiForm';

export function Home(): JSX.Element {

    return (
        <div id="home">
            <ActionSelect />
            <MultiForm />
        </div>
    )
}