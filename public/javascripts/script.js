var posts = $.ajax({
    url: "/articles",
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

  
  const HOME = "http://localhost:3000"
  
