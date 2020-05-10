import * as React from 'react';
import axios from 'axios';
import { Table, Space, Button } from 'antd';
import { get, filter } from 'lodash';
import moment from 'moment';
import { setItemInStore, getItemFromStore} from './service'
// import { useHistory } from "react-router-dom";
import { CaretUpOutlined } from '@ant-design/icons';
import './Home.css'
export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state= {
      data: [],
      currentPage: 0,
      hackerNewPost: getItemFromStore("0") == null ? get(this.state, 'hackerNewPost', []) : JSON.parse(getItemFromStore("0"))
      
    }
  }
  componentWillReceiveProps(nextProps){
  
  }
  fetchData = (pageNumber) => {

    axios.get(`http://hn.algolia.com/api/v1/search?tags=front_page&page=${pageNumber}`).
    then((result)=> {
      const {history} = this.props
      history.push({
        pathname: '/hacker-news',
        search: `?page=${pageNumber}`,
        state: { data: result.data, page: pageNumber  }
      })

    this.setState({data: result.data, currentPage:pageNumber }

    )
    console.log(0, JSON.parse(getItemFromStore(0)))
    console.log(1, JSON.parse(getItemFromStore(1)))
    if(getItemFromStore(this.state.currentPage) == null){
      this.setState({hackerNewPost:  get(result, 'data.hits', [])})
    }
    else{
      this.setState({hackerNewPost:  JSON.parse(getItemFromStore(this.state.currentPage))})
    }
  })
  }
  componentDidMount(){
    this.fetchData(this.state.currentPage)
  }
  handleNext = ()=> {
    const currentPage = this.state.currentPage
    
    this.fetchData( currentPage + 1 )
  }
  hideNewsPost = (e, hidePost) => {

    console.log(get(this.state, 'hackerNewPost', []), getItemFromStore(this.state.currentPage) )
    const dataToFilter = get(this.state, 'hackerNewPost')
    const newPostData = dataToFilter.filter((row)=> row.objectID != hidePost )
    
    setItemInStore(this.state.currentPage, JSON.stringify(newPostData) )
    this.setState({hackerNewPost: newPostData})
   
  }
  handlePrevious = ()=> {
    const currentPage = this.state.currentPage
    this.fetchData(currentPage - 1 )
  }
  handleVoteUpwards = (e, objectID) => {
   const newDataForUpVote =  get(this.state, 'hackerNewPost').map((row)=> {
      if(row.objectID == objectID) {
        return {
          ...row,
          points: row.points + 1
        }
      }
      return { ...row}
    })
    setItemInStore(this.state.currentPage, JSON.stringify(newDataForUpVote) )
    this.setState({hackerNewPost: newDataForUpVote})
  }
  render () {
    console.log(getItemFromStore(this.state.currentPage))
    const hackerNewPost =  get(this.state, 'hackerNewPost', []) 
    const nbPages = get(this.state, 'data.nbPages', [])
    console.log(this.state.currentPage > (nbPages - 1) ? true: false)
    const columns = [
      {
        title: 'Comments',
        dataIndex: 'num_comments',
        key: 'num_comments',
        width: 100
      },
      {
        title: 'Vote Count',
        dataIndex: 'points',
        key: 'points',
        width: 100
      },
      {
        title: 'UpVote',
        dataIndex: 'UpVote',
        key: 'UpVote',
        render: (text, record)=> (<CaretUpOutlined onClick={(e)=> this.handleVoteUpwards(e, record.objectID)}/>),
        width: 60
      },
      {
        title: 'News Details',
        key: 'new_details',
        render: (text, record) => {
          var now = moment(new Date()); //todays date
          var end = moment(record.created_at); // another date
          var duration = moment.duration(now.diff(end));
          var days = duration.asDays();
          return(
          <Space size="small">
            <span>{record.title}</span>
            <a style={{color : 'grey'}} href={record.url} target="blank">{record.url}</a> 
            by <span>{record.author}</span>
            <span>{days}</span>
            [<a style={{color : 'black'}} onClick={ (e) => this.hideNewsPost(e, record.objectID)}>Hide</a>]
          </Space>)
      },
      },
    ];
    
    return (
            <div className="app"  style={{paddingLeft: '80px', paddingRight: '80px'}}>
        <Table
          columns={columns}
          dataSource={hackerNewPost}
          pagination={{
            total: hackerNewPost.length,
            pageSize: hackerNewPost.length,
            hideOnSinglePage: true
          }}
          size="small"
          rowKey={record => record.objectID}
           />
           <Space size="small">
           <Button type="link" disabled = {this.state.currentPage == 0 ? true : false} onClick={this.handlePrevious}>Previous</Button> 
           <Button type="link" disabled = {this.state.currentPage >= (nbPages - 1) ? true: false} onClick={this.handleNext}>Next</Button> 
           </Space>
           
             </div>
    )
  }
}


