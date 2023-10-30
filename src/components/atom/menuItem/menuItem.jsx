import PropTypes from 'prop-types'
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import GroupWorkOutlinedIcon from '@mui/icons-material/GroupWorkOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

const MenuItem = (props) => {
  return (
    <div className='menuItem flex items-center px-3 text-sm h-8'>
        <div className="mr-2">
            {props.children == 'Friends' && <Diversity1OutlinedIcon/>}
            {props.children == 'Groups' && <GroupWorkOutlinedIcon/>}
            {props.children == 'Marketplace' && <StorefrontOutlinedIcon/>}
            {props.children == 'Watch' && <RemoveRedEyeOutlinedIcon/>}
            {props.children == 'Memories' && <MemoryOutlinedIcon/>}
            {props.children == 'Events' && <EventAvailableOutlinedIcon/>}
            {props.children == 'Gaming' && <SportsEsportsOutlinedIcon/>}
            {props.children == 'Gallery' && <CollectionsOutlinedIcon/>}
            {props.children == 'Videos' && <OndemandVideoOutlinedIcon/>}
            {props.children == 'Messages' && <MessageOutlinedIcon/>}
            {props.children == 'Fundraiser' && <ImportContactsOutlinedIcon/>}
            {props.children == 'Tutorials' && <LocalLibraryOutlinedIcon/>}
            {props.children == 'Courses' && <PaidOutlinedIcon/>}
        </div>
        <h3>{props.children}</h3>
    </div>
  )
}

MenuItem.propTypes = {
    children : PropTypes.string,
    ikon: PropTypes.string
}

export default MenuItem