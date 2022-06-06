function pushToTemplate(data) {
    console.log("PUSH HERE")
    console.log(data)
    //you should return data in order to use it in the next then ...
    return data
  }
  
  function getArticles(take = 10, skip = 0) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: HOME+"/articles",
        type: 'GET',
        data: {
          take: take,
          skip: skip,
      },
        success: function (data) {
          resolve(data)
        },
        error: function (error) {
          reject(error)
        },
      })
    })
  }

  var posts = $.ajax({
    url: "/articles",
    type: 'GET',
    // data: {
    //     take: 10,
    //     skip: 1,
    // },
  })

  var users = $.ajax({
    url: "/users",
    type: 'GET',
    // data: {
    //     take: 10,
    //     skip: 1,
    // },
  })

  var category = $.ajax({
    url: "/categories",
    type: 'GET',
    // data: {
    //     take: 10,
    //     skip: 1,
    // },
  })
    
  posts.then(getArticles => {
      
  for (const id in getArticles) {

    $('#Posts').append(` 
    <div class="card" style="width: 30rem;margin-top: 40px;  ">
    <img src="${getArticles[id].photos}?random=${Math.random()}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-text font-weight-bold text-success">@${getArticles[id].autor.name}</h5>
      <h5 class="card-title">${getArticles[id].title}</h5>
      <p class="card-text">${getArticles[id].content}</p>
      <p class="card-text">${getArticles[id].createdAt}</p>
      <button type="button" class="btn btn-primary">Primary</button>
      <a href="#" class="btn btn-primary">Read comments</a>
    </div>
  </div>   
  
    `);
    }
    })

  function getUsers(take = 10, skip = 0) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: HOME+"/users",
        type: 'GET',
        data: {
          take: take,
          skip: skip,
      },
        success: function (data) {
          resolve(data)
        },
        error: function (error) {
          reject(error)
        },
      })
    })
  }
  function getCategories(take = 10, skip = 0) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: HOME+"/categories",
        type: 'GET',
        data: {
          take: take,
          skip: skip,
      },
        success: function (data) {
          resolve(data)
        },
        error: function (error) {
          reject(error)
        },
      })
    })
  }
  function getComments(take = 10, skip = 0) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: HOME+"/commentaires",
        type: 'GET',
        data: {
          take: take,
          skip: skip,
      },
        success: function (data) {
          resolve(data)
        },
        error: function (error) {
          reject(error)
        },
      })
    })
  }
  
  const HOME = "http://localhost:3000"
  
  $(document).ready( () => {
      getArticles().then(pushToTemplate).catch(console.error)
      getUsers().then(pushToTemplate).catch(console.error)
      getCategories().then(pushToTemplate).catch(console.error)
      getComments().then(pushToTemplate).catch(console.error)
  })
