import PropTypes from "prop-types";
import './userWidget.scss'

const UserWidget = (props) => {
  if (props.fungsi == "suggest") {
    return (
      <div className="flex w-full h-8 justify-between items-center">
        <div className="flex items-center w-4/6">
          <div className="w-5 h-5 border-2 rounded-full mr-2"></div>
          <h3 className="text-xs font-bold">Deni Pamungkas</h3>
        </div>
        <div className="w-2/6 flex justify-between text-white">
          <button className="w-10 h-5 bg-blue-600 text-xs">follow</button>
          <button className="w-10 h-5 bg-red-600 text-xs">dismiss</button>
        </div>
      </div>
    );
  } else if (props.fungsi == "activities") {
    return (
        <div className="flex w-full h-8 justify-between items-center">
        <div className="flex items-center w-5/6">
          <h3 className="fontKecil font-bold">Deni Pamungkas</h3>
          <p className="fontKecil">changed cover picture</p>
        </div>
        <div className="w-1/6">
          <p className="fontKecil">1m ago</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full h-8 justify-between items-center">
    <div className="flex items-center w-4/6">
      <div className="w-5 h-5 border-2 rounded-full mr-2"></div>
      <h3 className="text-xs font-bold">Deni Pamungkas</h3>
    </div>
  </div>
  );
};

UserWidget.propTypes = {
  fungsi: PropTypes.string,
};

export default UserWidget;
