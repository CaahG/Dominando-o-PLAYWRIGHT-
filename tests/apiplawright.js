test.beforeAll(async ({ request }) => {
    // Create a new repository
    const response = await request.post('/user/repos', {
      data: {
        name: REPO
      }
    });
    expect(response.ok()).toBeTruthy();
  });
  
  test.afterAll(async ({ request }) => {
    // Delete the repository
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();
  });