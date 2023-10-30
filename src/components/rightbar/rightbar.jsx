import UserWidget from "../atom/userWidget/userWidget"
import './rightbar.scss'

const RightBar = () => {
  return (
    <div className="rightBar  w-1/5 h-screen text-sm py-3 pr-3">
      <section className="suggestion p-3 bg-white h-auto mb-3">
        <h3 className="text-base">Suggestion for you</h3>
        <UserWidget fungsi={'suggest'}/>
        <UserWidget fungsi={'suggest'}/>
        <UserWidget fungsi={'suggest'}/>
      </section>
      <section className="activities p-3 bg-white h-auto mb-3">
        <h3 className="text-base">Last Activities</h3>
        <UserWidget fungsi={'activities'}/>
        <UserWidget fungsi={'activities'}/>
        <UserWidget fungsi={'activities'}/>
        <UserWidget fungsi={'activities'}/>
      </section>
      <section className="online p-3 bg-white h-auto">
        <h3 className="text-base">Friends Online</h3>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
        <UserWidget fungsi={''}/>
      </section>
    </div>
  )
}

export default RightBar