\c mindtherags_development
DO
$$
    DECLARE
        userId int;
    BEGIN
        INSERT INTO users ( email, password, name, "createdAt", "updatedAt")
        VALUES
        ('test@example.com', '$2b$09$ocHMfN0b7.m94MgBhWPYL.c7U6bZ8OSSuQzeVLN9/COZco2vvgSNW', 'Kristoffer', '30230192', 'Søren', 'efternavn', 5025, 454544545, now(), now())
        RETURNING id INTO userId;

        INSERT INTO posts(user_id, post, "createdAt", "updatedAt")
        VALUES
        (userId, "Today is going to be a great day!", now(), now()),
        (userId, "Just got a puppy!", now(), now()),
        (userId, "I want a puppy..", now(), now());

        COMMIT;
        BEGIN
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'rolling back! % %', SQLERRM, SQLSTATE;
            ROLLBACK;
        END;
        raise notice 'Insertion succesful';
    END
$$
language plpgsql