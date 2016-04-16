var PhotoAlbum = React.createClass({
  loadInitialPhotos: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({data: data.photos.photo});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  onPhotoSubmit: function(page) {
    var photos = this.state.data;

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: page,
      success: function(data) {
        console.log(data);
        var newPhotos = photos.concat(data.photos.photo);
        this.setState({data: newPhotos});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadInitialPhotos();
  },
  render: function() {
    return(
      <div>
        <PhotoPage data={this.state.data} />
        <PhotoForm onPhotoSubmit={this.onPhotoSubmit}/>
      </div>
    );
  }
});
    

var PhotoPage = React.createClass({
  render: function() {
    var pictureNodes = this.props.data.map(function(photo) {
      return(
        <Photo farm={photo.farm} server={photo.server} id={photo.id} secret={photo.secret} key={photo.id} />
      );
    });
    return(
      <div id="album" className="tra df flw center-fl">
      {pictureNodes}
      </div>
    );
  }
});

var Photo = React.createClass({
  render: function() {
    var source = "https://farm" + this.props.farm + ".staticflickr.com/" + this.props.server + "/" + this.props.id + "_" + this.props.secret + "_q.jpg";
    return(
      <picture className="di ma3">
        <img className="tra" src={source} />
      </picture>
    );
  }
});

var PhotoForm = React.createClass({
  getInitialState: function() {
    return {page: 1};
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var page = this.state.page;
    page++;
    
    this.props.onPhotoSubmit({page: page});
    this.setState({page: page});
  },
  render: function() {
    return(
      <form className="photoForm" onSubmit={this.handleSubmit}>
      <input type="hidden" value={this.state.page} />
      <input type="submit" value="more" className="btn b db sans f7 pv1 ph2 center-b mv3" />
      </form>
    );
  }
});

ReactDOM.render( 
  <PhotoAlbum url="/api/photos" />, 
  document.getElementById('container') 
);
