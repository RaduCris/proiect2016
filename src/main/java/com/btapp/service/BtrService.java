package com.btapp.service;

import com.btapp.domain.Btr;
import com.btapp.domain.User;
import com.btapp.repository.BtrRepository;
import com.btapp.repository.UserRepository;
import com.btapp.repository.search.BtrSearchRepository;
import com.btapp.web.rest.UserResource;
import com.btapp.web.rest.dto.ManagedUserDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Btr.
 */
@Service
@Transactional
public class BtrService {

    private final Logger log = LoggerFactory.getLogger(BtrService.class);
    
    @Inject
    private UserRepository userRepository;
    
    @Inject
    private BtrRepository btrRepository;
    
    @Inject
    private BtrSearchRepository btrSearchRepository;
    
    /**
     * Save a btr.
     * @return the persisted entity
     */
    public Btr save(Btr btr) {
        log.debug("Request to save Btr : {}", btr);
        
       btr.getUser();
		// String user = User.getCurrentUser();
       //Optional user = userRepository.findOneByLogin(btr.getUser().getCurrentUser());
        Optional<User> user = userRepository.findOneByLogin(User.getCurrentUser());
        btr.setStatus("Initiated");    
        //btr.setAssigned_from(User.getCurrentUser());   
        //btr.setAssigned_from(User.class.cast(User.getCurrentUser()));  // nu merge!
      //  btr.setAssigned_from((User) userRepository.findOneByLogin(user));
        btr.setAssigned_from((User)user.get());
        btr.setManager((User)user.get());
        btr.setRequest_date(ZonedDateTime.now());
        btr.setLast_modified_date(ZonedDateTime.now()); // modificat 25.03.2016
        Btr result = btrRepository.save(btr);
        btrSearchRepository.save(result);
        return result;
    }


	/**
     *  get all the btrs.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<Btr> findAll(Pageable pageable) {
        log.debug("Request to get all Btrs");
        Page<Btr> result = btrRepository.findAll(pageable); 
        return result;
    }

    /**
     *  get one btr by id.
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Btr findOne(Long id) {
        log.debug("Request to get Btr : {}", id);
        Btr btr = btrRepository.findOne(id);
        return btr;
    }

    /**
     *  delete the  btr by id.
     */
    public void delete(Long id) {
        log.debug("Request to delete Btr : {}", id);
        btrRepository.delete(id);
        btrSearchRepository.delete(id);
    }

    /**
     * search for the btr corresponding
     * to the query.
     */
    @Transactional(readOnly = true) 
    public List<Btr> search(String query) {
        
        log.debug("REST request to search Btrs for query {}", query);
        return StreamSupport
            .stream(btrSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
