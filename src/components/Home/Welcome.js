import React, { Component } from 'react';
import style from './style.scss'; // eslint-disable-line
import { Button } from 'react-toolbox/lib/button';
import axios from 'axios';
import PreLoader from '../common/Preloader';

let url = 'http://examy.live/v1/';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: url + 'exam',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTc0MDA3MTM0fQ.nLOSYyTX_oTrbzJIlvFM7nAZTdrJXw3JyqaEgqqdFGE'
      }
    })
      .then(result => {
        let data = [];
        result.data.forEach((element, index) => {
          data[index] = [];
          data[index].push(element._id);
          data[index].push(element.name);
          data[index].push(element.duration);
          data[index].push(element.sections.length);
          let categories = '';
          element.category.forEach(string => {
            categories += string + ' ';
          });
          data[index].push(categories);
          data[index].push('<a>Delete</a>');
          data[index].push(categories);
        });
        this.setState({ loading: false });
        $(this.refs.main).DataTable({
          bLengthChange: false,
          bInfo: false,
          language: {
            search: 'Хайх:',
            paginate: {
              first: 'Эхнийх',
              last: 'Сүүлийнх',
              next: 'Дараагийнх',
              previous: 'Өмнөх'
            }
          },
          lengthMenu: [25],
          columns: [
            { visible: false },
            { title: 'Тестийн нэр' },
            { title: 'Үргэлжлэх хугацаа' },
            { title: 'Нийт хэсгүүд' },
            { title: 'Төрлүүд' },
            { title: 'Устгах' },
            { title: 'Засах' }
          ],
          data: data,
          columnDefs: [
            {
              targets: -2,
              render: (data, type, row) => {
                let id = row[0];
                var checkbox = '<a style="color:red;" id="' + id + '" href="#" >Устгах</a>';
                $('#' + id).click(() => {
                  this.setState({ loading: true });
                  axios({
                    method: 'delete',
                    url: url + 'exam?id=' + id,
                    headers: {
                      Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTc0MDA3MTM0fQ.nLOSYyTX_oTrbzJIlvFM7nAZTdrJXw3JyqaEgqqdFGE'
                    }
                  }).then(result => {
                    location.reload();
                  });
                });
                return checkbox;
              }
            },
            {
              targets: -1,
              render: function(data, type, row) {
                var checkbox = '<a>Засах</a>';
                return checkbox;
              }
            }
          ]
        });
      })
      .catch(console.log);
  }

  render() {
    return (
      <section className={style.welcome}>
        <table ref="main" />
        <PreLoader isLoading={this.state.loading} />
      </section>
    );
  }
}

export default Welcome;
