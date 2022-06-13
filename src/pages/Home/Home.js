import React from "react";
import './Home.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";

const styles = {

}

export default function Home(props){
    var accountData = props.cookies.accountData

    return (
        <FlexibleBlocksPage marginTop={51} >
            <FlexibleBlock background={false}>
                <div class="header_text">О компании:</div>
                <div style={{width:900}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum dignissim mauris, ut tincidunt urna efficitur ut. Curabitur quis congue nisl, non tempus tellus. Pellentesque molestie dictum leo, non fermentum erat tristique ut. Aliquam facilisis orci libero, et sollicitudin nisi congue vel. Ut lobortis tempus quam vitae accumsan. Aliquam at neque sed leo interdum consectetur sit amet id metus. Cras viverra urna in neque gravida vehicula. Cras non leo lectus. Quisque aliquam quam sit amet orci tristique consectetur. Suspendisse potenti. Nulla quam sem, dignissim vulputate elit ut, molestie fringilla metus. Suspendisse at enim a sem suscipit gravida. Aenean semper eu risus a congue. Ut condimentum lectus odio, sed finibus arcu vehicula nec. Etiam facilisis ante ac justo pharetra, a rhoncus nunc scelerisque. Vivamus tincidunt metus at lectus suscipit pellentesque.
                    <br/><br/>
                    Mauris commodo nunc ut erat accumsan semper. Aliquam congue, mauris at maximus dapibus, ante ex maximus sapien, in interdum lacus ligula eget nisi. Fusce sed odio eu odio accumsan tristique non nec tortor. Sed placerat, magna at hendrerit semper, turpis metus dictum arcu, id gravida est nisl vitae elit. Morbi venenatis tellus id lacus bibendum, ac accumsan arcu euismod. Vestibulum ac euismod dolor, at vestibulum urna. Nulla vehicula, lectus sed euismod ullamcorper, velit lectus blandit eros, ut facilisis neque elit a sapien.
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}
