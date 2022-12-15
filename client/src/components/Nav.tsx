const Nav = () => (
  <aside className='w-[350px]'>
    <input type='text' className='rounded border-black p-4' />
    <div className='flex flex-col'>
      <div className='flex w-full border border-black py-4 px-3'>
        <img src='/' alt='group_logo' className='mr-4 h-[50px] w-[50px] rounded-[50%]  bg-black' />
        <div className='flex-auto'>
          <h2>title</h2>
          <p>text</p>
        </div>
      </div>
      <div className='flex w-full border border-black p-4'>
        <img src='/' alt='group_logo' className='mr-4 h-[50px] w-[50px] rounded-[50%]  bg-black' />
        <div className='flex-auto'>
          <h2>title</h2>
          <p>text</p>
        </div>
      </div>
      <div className='flex w-full border border-black p-4'>
        <img src='/' alt='group_logo' className='mr-4 h-[50px] w-[50px] rounded-[50%]  bg-black' />
        <div className='flex-auto'>
          <h2>title</h2>
          <p>text</p>
        </div>
      </div>
    </div>
  </aside>
);

export default Nav;
