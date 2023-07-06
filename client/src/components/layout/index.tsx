import Header from '../header'
import styles from './index.module.css'
import {Layout as AntdLayout} from 'antd'
type Props = {
    children: React.ReactNode
}
const Layout: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.main}>
        <Header />
        <AntdLayout.Content style={{height: '100%'}}>
            {children}
        </AntdLayout.Content>
        
    </div>
  )
}


export default Layout; 
