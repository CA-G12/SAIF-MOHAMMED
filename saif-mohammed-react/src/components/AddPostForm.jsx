import React, { Component } from 'react'

class AddPostForm extends Component {
  constructor(){
    super();
    this.state = {
        post: {
            title: '',
            body: '',
            img: '',
        }
    }
  }

  validate = () => {
    if(this.state.post.title.trim() === '' || this.state.post.body.trim() === '' || this.state.post.img.trim() === ''){
        return false;
    }
    return true;
  }
  render() {
    return (
        <div className='add-post'>

            <button onClick={this.props.goHome} className="go-home">Go home</button>
            <h3 className='add-post-title'>Add post</h3>
            <form>
                    <input required type="text" placeholder='title' onChange={(e) => this.setState({post : {...this.state.post, title: e.target.value} })}/>
                    <input required type="text" placeholder='content' onChange={(e) => this.setState({post : {...this.state.post, body: e.target.value} })}/>
                    <input required type="text" placeholder='image' onChange={(e) => this.setState({post : {...this.state.post, img: e.target.value} })}/>

                    <button onClick={(e) => {
                        e.preventDefault()
                        if(this.validate()){
                            this.props.addPost(this.state.post)
                            this.props.goHome();
                        }else{
                            alert('check your inputs, please')
                        }
                       
                    }}>Add</button>
            </form>
        </div>
    )
  }
}

export default AddPostForm