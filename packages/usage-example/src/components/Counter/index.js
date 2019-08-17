import ComponentBackbone from '../../common/ComponentBackbone';
import Label from './Label';
import Less from './Less';
import Add from './Add';

class Counter extends ComponentBackbone {
    
    constructor(subscriptions) {
        super()

        /* this.$el.append(new Less().$el);
        this.$el.append(new Label().$el);
        this.$el.append(new Add().$el); */
        this.$el.append(new (Less(subscriptions))().$el);
        this.$el.append(new (Label(subscriptions))().$el);
        this.$el.append(new (Add(subscriptions))().$el);
    }
};

export default Counter;