import CardList from "../CardList";
import { Completed, InProgress, Info} from "../PrizeCard";

const PrizeCardListFactory = {
    createCompleted(prizes) {
        const data = prizes.filter(p=>!!p.completed_at)
        return <CardList dataSource={data}
                    cardView={Completed}/>
    },
    createInProgress(prizes) {
        const data = prizes.filter(p=>!p.completed_at)
        return <CardList dataSource={data}
                    cardView={InProgress}/>
    },
    createTotal(achievements) {
        return <CardList dataSource={achievements}
                    cardView={Info}/>
    }
}
export default PrizeCardListFactory