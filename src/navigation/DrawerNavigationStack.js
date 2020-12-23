import { createDrawerNavigator } from '@react-navigation/drawer'
import DashBoard from '../components/dashboard/DashBoard';

const Drawer = createDrawerNavigator();

function drawerNavigator() {
    <Drawer.Navigator>
        <Drawer.Screen name = 'Notes' component = {DashBoard} />
    </Drawer.Navigator>
}

export default drawerNavigator;