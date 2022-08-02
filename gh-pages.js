import ghpages from 'gh-pages';

ghpages.publish(
    'public',
    {
        branch: 'main',
        repo: 'https://github.com/sntbtty/assessment_task.git',
        user: {
            name: 'Alexandra Vlasenko',
            email: 'alexandravlasenko98@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)