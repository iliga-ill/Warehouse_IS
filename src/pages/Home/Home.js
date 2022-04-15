import React from "react";
import './Home.css';
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";

const styles = {

}

export default function Home(props){
    var accountData = props.cookies.accountData

    return (
        <FlexibleBlocksPage>
            <FlexibleBlock>
                <div class="header_text">О компании:</div>
                <div style={{width:900}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum dignissim mauris, ut tincidunt urna efficitur ut. Curabitur quis congue nisl, non tempus tellus. Pellentesque molestie dictum leo, non fermentum erat tristique ut. Aliquam facilisis orci libero, et sollicitudin nisi congue vel. Ut lobortis tempus quam vitae accumsan. Aliquam at neque sed leo interdum consectetur sit amet id metus. Cras viverra urna in neque gravida vehicula. Cras non leo lectus. Quisque aliquam quam sit amet orci tristique consectetur. Suspendisse potenti. Nulla quam sem, dignissim vulputate elit ut, molestie fringilla metus. Suspendisse at enim a sem suscipit gravida. Aenean semper eu risus a congue. Ut condimentum lectus odio, sed finibus arcu vehicula nec. Etiam facilisis ante ac justo pharetra, a rhoncus nunc scelerisque. Vivamus tincidunt metus at lectus suscipit pellentesque.
                    <br/><br/>
                    Mauris commodo nunc ut erat accumsan semper. Aliquam congue, mauris at maximus dapibus, ante ex maximus sapien, in interdum lacus ligula eget nisi. Fusce sed odio eu odio accumsan tristique non nec tortor. Sed placerat, magna at hendrerit semper, turpis metus dictum arcu, id gravida est nisl vitae elit. Morbi venenatis tellus id lacus bibendum, ac accumsan arcu euismod. Vestibulum ac euismod dolor, at vestibulum urna. Nulla vehicula, lectus sed euismod ullamcorper, velit lectus blandit eros, ut facilisis neque elit a sapien.
                    <br/><br/>
                    Proin vitae ex nec metus pretium ornare. Etiam at congue ligula. Nam aliquam sodales tellus. In in quam nibh. Phasellus sed lacinia ligula. Suspendisse quis orci ac nisi hendrerit faucibus eget ut turpis. Pellentesque consectetur facilisis pharetra. Morbi tempus viverra ante. Donec molestie sodales pharetra. Curabitur enim orci, volutpat varius lorem ac, bibendum imperdiet nulla. Sed sed lacus eu ante facilisis pulvinar eget malesuada neque. Aliquam luctus erat pellentesque est consectetur, porttitor imperdiet purus rhoncus.
                    <br/><br/>
                    Nulla pulvinar viverra libero a lacinia. Maecenas tincidunt ligula id aliquam fringilla. Nulla quam sapien, ornare quis suscipit ullamcorper, aliquam sed arcu. Nunc ac semper elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu finibus leo. Vestibulum molestie risus elit, sed congue nunc maximus eu. Morbi efficitur auctor neque, at sodales lectus pretium in. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    <br/><br/>
                    Vivamus ultricies urna massa, sed feugiat eros efficitur sit amet. Sed varius nisl ac maximus vehicula. Sed ullamcorper enim et pretium bibendum. Duis ac nisi turpis. Sed consectetur lacus lorem. Suspendisse potenti. Nunc scelerisque, augue ut iaculis vestibulum, lectus urna cursus risus, eget vehicula dolor ligula in risus. Donec commodo nunc a turpis suscipit aliquet. Aenean purus lorem, convallis sit amet commodo at, euismod commodo odio. Donec hendrerit massa eget dui vestibulum ultrices. Quisque a mi non turpis iaculis ullamcorper.
                </div>
            </FlexibleBlock>
        </FlexibleBlocksPage>
    )
}
