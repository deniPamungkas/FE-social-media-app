import Posts from "../../components/molekul/posts/posts"
import Share from "../../components/molekul/share/share"
import Stories from "../../components/molekul/stories/stories"

const Home = () => {
  return (
    <div className="w-1/2 py-3">
      <Stories/>
      <br />
      <Share/>
      <br />
      <Posts/>
    </div>
    
  )
}

export default Home