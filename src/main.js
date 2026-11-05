
import './style.css';
import { api } from './https.js';

const app = document.querySelector('#app');

let posts = [];
let selectedUser = '';


const englishPosts = [
  {
    id: 1,
    userId: 1,
    title: 'Welcome to Our Digital Community',
    body: 'Discover useful ideas, share your experiences, and connect with people who enjoy learning and growing together.'
  },
  {
    id: 2,
    userId: 2,
    title: 'The Importance of Learning Every Day',
    body: 'Learning something new every day helps us develop our skills, improve our knowledge, and become better at what we do.'
  },
  {
    id: 3,
    userId: 3,
    title: 'Simple Ways to Stay Productive',
    body: 'Set clear goals, organize your tasks, avoid distractions, and take regular breaks to maintain your productivity.'
  },
  {
    id: 4,
    userId: 4,
    title: 'Technology Is Changing Our World',
    body: 'Technology makes communication easier, improves access to information, and creates new opportunities for businesses and individuals.'
  },
  {
    id: 5,
    userId: 5,
    title: 'Building Better Habits',
    body: 'Small positive actions repeated every day can lead to meaningful improvements in your personal and professional life.'
  },
  {
    id: 6,
    userId: 6,
    title: 'Why Teamwork Matters',
    body: 'Working together allows people to share ideas, solve problems, support one another, and achieve common goals.'
  },
  {
    id: 7,
    userId: 7,
    title: 'The Power of Creativity',
    body: 'Creativity encourages us to think differently, explore new possibilities, and find innovative solutions to everyday challenges.'
  },
  {
    id: 8,
    userId: 8,
    title: 'Managing Your Time Effectively',
    body: 'Planning your day, prioritizing important tasks, and setting realistic deadlines can help you manage your time better.'
  },
  {
    id: 9,
    userId: 9,
    title: 'The Future of Web Development',
    body: 'Modern web development continues to evolve through new tools, frameworks, technologies, and better user experiences.'
  },
  {
    id: 10,
    userId: 10,
    title: 'Never Stop Improving',
    body: 'Every challenge is an opportunity to learn. Stay curious, practice consistently, and keep working towards your goals.'
  }
];

app.innerHTML = `
  <div class="min-h-screen bg-[#f7f7f2] lg:flex">

    <aside class="bg-[#193b2b] p-6 text-white lg:fixed lg:inset-y-0 lg:w-64">

      <h1 class="text-2xl font-bold">
        Post<span class="text-[#b6d8bd]">Space.</span>
      </h1>

      <p class="mt-2 text-sm text-green-100/60">
        Content Management
      </p>

      <nav class="mt-12 space-y-3">
        <a href="#" class="block rounded-xl bg-white/10 px-4 py-3">
          Dashboard
        </a>

        <a href="#posts" class="block rounded-xl px-4 py-3 text-green-100/70 hover:bg-white/10">
          All Posts
        </a>

        <a href="#create-post" class="block rounded-xl px-4 py-3 text-green-100/70 hover:bg-white/10">
          + Create Post
        </a>
      </nav>

      <div class="mt-12 rounded-xl border border-white/10 bg-white/5 p-4">
        <p class="text-xs text-green-100/60">WORKSPACE</p>
        <p class="mt-2 font-semibold">Personal Blog</p>
        <p class="mt-1 text-xs text-green-100/60">
          JSONPlaceholder API
        </p>
      </div>

    </aside>

    <main class="w-full p-5 sm:p-8 lg:ml-64 lg:p-10">

      <header class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-sm text-slate-500">Workspace / Dashboard</p>
          <h2 class="mt-2 text-3xl font-bold text-[#193b2b]">
            Content Overview
          </h2>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#dce9df] font-bold text-[#193b2b]">
            A
          </div>

          <div>
            <p class="text-sm font-semibold">Administrator</p>
            <p class="text-xs text-slate-500">Content Manager</p>
          </div>
        </div>
      </header>

      <section class="mb-8 rounded-2xl bg-[#dce9df] p-8">
        <p class="text-sm font-semibold uppercase tracking-widest text-[#52745d]">
          Your workspace
        </p>

        <h2 class="mt-3 max-w-xl text-3xl font-bold text-[#193b2b]">
          Manage your content. Keep your ideas organized.
        </h2>

        <p class="mt-4 text-sm leading-6 text-[#526b59]">
          Create, explore, update and organize your posts
          in one simple workspace.
        </p>

        <a href="#create-post"
          class="mt-6 inline-block rounded-lg bg-[#193b2b] px-6 py-3 text-sm font-semibold text-white hover:bg-[#28543d]">
          + Create New Post
        </a>
      </section>

      <section id="create-post" class="mb-10 rounded-2xl border border-[#e8e9e1] bg-white p-6">

        <h3 class="mb-5 text-xl font-bold text-[#193b2b]">
          Write a New Post
        </h3>

        <form id="post-form" class="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Enter post title..."
            required
            class="w-full rounded-xl border border-slate-200 bg-[#fafbf8] p-4 outline-none focus:border-[#52745d]"
          >

          <textarea
            name="body"
            rows="4"
            placeholder="Write your post content..."
            required
            class="w-full rounded-xl border border-slate-200 bg-[#fafbf8] p-4 outline-none focus:border-[#52745d]"
          ></textarea>

          <button
            type="submit"
            class="rounded-xl bg-[#193b2b] px-7 py-3 font-semibold text-white hover:bg-[#28543d]"
          >
            Publish Post
          </button>

        </form>
      </section>

      <section id="posts">

        <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-[#78927e]">
              Your content library
            </p>

            <h3 class="mt-2 text-2xl font-bold text-[#193b2b]">
              Recent Posts
            </h3>
          </div>

          <select id="user-filter"
            class="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <option value="">All Users</option>
            ${Array.from({ length: 10 }, (_, i) =>
  `<option value="${i + 1}">User ${i + 1}</option>`
).join('')}
          </select>
        </div>

        <p id="status" class="mb-5 text-sm text-slate-500">
          Loading posts...
        </p>

        <div id="posts-container"
          class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        </div>

      </section>

      <footer class="mt-14 border-t border-slate-200 py-6 text-center text-sm text-slate-400">
        PostSpace. &copy; 2026 — Built with JavaScript and Tailwind CSS.
      </footer>

    </main>
  </div>
`;

// ==========================================
// 4. SELECT HTML ELEMENTS
// ==========================================

const postsContainer = document.querySelector('#posts-container');
const status = document.querySelector('#status');
const postForm = document.querySelector('#post-form');
const userFilter = document.querySelector('#user-filter');


function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);
}


function renderPosts() {
  postsContainer.innerHTML = '';

  if (posts.length === 0) {
    status.textContent = 'No posts found. Create your first post!';
    return;
  }

  status.textContent = `${posts.length} posts found`;

  posts.forEach(post => {
    const card = document.createElement('article');

    card.className =
      'rounded-2xl border border-[#e8e9e1] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg';

    card.innerHTML = `
      <div class="mb-4 flex items-center justify-between">

        <span class="rounded-full bg-[#dce9df] px-3 py-1 text-xs font-semibold text-[#193b2b]">
          User ${post.userId}
        </span>

        <span class="text-xs text-slate-400">
          #${post.id}
        </span>

      </div>

      <h3 class="mb-3 text-lg font-bold text-[#193b2b]">
        ${escapeHTML(post.title)}
      </h3>

      <p class="mb-6 text-sm leading-6 text-slate-500">
        ${escapeHTML(post.body)}
      </p>

      <div class="flex gap-3 border-t border-slate-100 pt-4">

        <button
          data-action="edit"
          data-id="${post.id}"
          class="rounded-lg bg-[#dce9df] px-4 py-2 text-sm font-semibold text-[#193b2b] hover:bg-[#c8ddce]">
          Edit
        </button>

        <button
          data-action="delete"
          data-id="${post.id}"
          class="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100">
          Delete
        </button>

      </div>
    `;

    postsContainer.appendChild(card);
  });
}


async function loadPosts(userId = '') {
  status.textContent = 'Loading posts...';
  postsContainer.innerHTML = '';

  try {
    const apiPosts = userId
      ? await api.getPostsByUser(userId)
      : await api.getPosts();

    // Use English sample content for the displayed posts.
    // Keep the API IDs and user IDs for CRUD operations.
    posts = apiPosts.map((post, index) => {
      const sample = englishPosts.find(item => item.id === post.id)
        || englishPosts[index % englishPosts.length];

      return {
        ...post,
        title: sample.title,
        body: sample.body
      };
    });

    renderPosts();

  } catch (error) {
    status.textContent = `Unable to load posts: ${error.message}`;
  }
}


postForm.addEventListener('submit', async event => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(postForm));

  const newPost = {
    userId: 1,
    title: data.title.trim(),
    body: data.body.trim(),
  };

  if (!newPost.title || !newPost.body) return;

  const button = postForm.querySelector('button');

  button.disabled = true;
  button.textContent = 'Publishing...';

  try {
    const createdPost = await api.createPost(newPost);

    posts.unshift(createdPost);

    userFilter.value = '';
    selectedUser = '';

    renderPosts();
    postForm.reset();

    status.textContent = 'Your post was published successfully!';

  } catch (error) {
    alert(`Unable to publish your post: ${error.message}`);

  } finally {
    button.disabled = false;
    button.textContent = 'Publish Post';
  }
});

// ==========================================
// 9. FILTER POSTS BY USER
// ==========================================

userFilter.addEventListener('change', () => {
  selectedUser = userFilter.value;
  loadPosts(selectedUser);
});


postsContainer.addEventListener('click', async event => {
  const button = event.target.closest('button[data-action]');

  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  const post = posts.find(item => item.id === id);

  if (!post) return;

  button.disabled = true;

  try {
    if (action === 'edit') {
      const newTitle = prompt('Enter the new post title:', post.title);

      if (!newTitle || !newTitle.trim()) return;

      const updatedPost = await api.updatePost(id, newTitle.trim());

      posts = posts.map(item =>
        item.id === id
          ? { ...item, ...updatedPost, title: newTitle.trim() }
          : item
      );

      renderPosts();
      status.textContent = 'Post updated successfully!';
    }

    if (action === 'delete') {
      const confirmed = confirm(
        'Are you sure you want to delete this post?'
      );

      if (!confirmed) return;

      await api.deletePost(id);

      posts = posts.filter(item => item.id !== id);

      renderPosts();
      status.textContent = 'Post deleted successfully!';
    }

  } catch (error) {
    alert(`The operation failed: ${error.message}`);

  } finally {
    button.disabled = false;
  }
});


loadPosts();
