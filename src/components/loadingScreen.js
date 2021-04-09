import React, { Component } from 'react'

export default class LoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval: ''
        }
        this.img = React.createRef();
    }
    animate = () => {
        setTimeout(() => {
            this.img.current.classList.add('big');
            setTimeout(() => {
                if (this.img.current) {
                    this.img.current.classList.remove('big');
                }
            }, 1000)
        }, 200)
        const interval = setInterval(() => {
            this.img.current.classList.add('big');
            setTimeout(() => {
                if (this.img.current) {
                    this.img.current.classList.remove('big');
                }
            }, 1000)
        }, 2000)
        this.setState({interval})
    }
    componentDidMount = () => {
        this.animate();
    }
    componentWillUnmount = () => {
        clearInterval(this.state.interval);
    }
    render() {
        return (
            <div className='loading-screen'>
                <img ref={this.img} alt='Logo' src='logo.svg'></img>
            </div>
        )
    }
}
