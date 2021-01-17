import React, { Component } from "react";

class Feed extends React.Component {
  state = {
    feeds: [
      {
        id: "1212092627178287104",
        text:
          "These launches would not be possible without the feedback you provided along the way, so THANK YOU to everyone who has contributed your time and ideas. Have more feedback? Let us know ⬇️ https://t.co/Vxp4UKnuJ9",
      },
      {
        id: "1212092627178287104",
        text:
          "These launches would not be possible without the feedback you provided along the way, so THANK YOU to everyone who has contributed your time and ideas. Have more feedback? Let us know ⬇️ https://t.co/Vxp4UKnuJ9",
      },
      {
        id: "1212092627178287104",
        text:
          "These launches would not be possible without the feedback you provided along the way, so THANK YOU to everyone who has contributed your time and ideas. Have more feedback? Let us know ⬇️ https://t.co/Vxp4UKnuJ9",
      },
    ],
  };
  componentDidMount() {
    //
    //axios.get('url').then((feeds)=>{
    //             this.setState({
    //                 feeds
    //             })
    //       }
    //       })
  }
  render() {
    return (
      <div className="left">
        {this.state.feeds.map((feed, index) => {
          return (
            <div className="one">
              <p>{feed.text}</p>
              <p>{index}</p>
              <h1>vikas</h1>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Feed;
